import { AzureFunction, Context } from '@azure/functions';
import * as puppeteer from 'puppeteer';
import * as shortid from 'shortid';
import ICheck from '../lib/models/check';
import IRawCheck from '../lib/models/raw_check';

const timerTrigger: AzureFunction = async function (
  context: Context,
  timer: any
): Promise<void> {
  const url = process.env.WEBSITE_URL || 'https://www.lernsax.de/';
  const url_login =
    process.env.WEBSITE_URL_LOGIN ||
    'https://www.lernsax.de/wws/9.php#/wws/100001.php';

  // Launch puppeteer
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();

  let response;
  let loginCheckResponse;
  let isOffline: boolean = true;
  let loginEnabled: boolean = false;

  let metricsStart = await page.metrics();

  try {
    response = await page.goto(url, {
      timeout: 40000,
      waitUntil: 'networkidle2'
    });
  } catch (error) {
    context.log(error);
    isOffline = true;
  }

  if (response) {
    const loginPage = await browser.newPage();
    isOffline = false;

    // TODO: Enhance check and remove temp url
    try {
      loginCheckResponse = await loginPage.goto(url_login, {
        timeout: 40000,
        waitUntil: 'networkidle2'
      });
    } catch (error) {
      context.log(error);
    }

    if (loginCheckResponse) {
      const frame = loginPage
        .frames()
        .find((frame) => frame.name() === 'main_frame');

      const frameContent = await frame.content();
      if (frameContent) {
        // TODO: Extract to environment variables
        const found_de = frameContent.match(
          'Ein Login ist zur Zeit leider nicht möglich.'
        );

        const found_en = frameContent.match(
          'At the moment it is impossible to login.'
        );

        if (found_de || found_en) {
          loginEnabled = false;
        } else {
          loginEnabled = true;
        }
      }
    }

    loginPage.close();
  }

  if (timer.isPastDue) {
    context.log('Timer function is running late!');
  }

  // TODO: Add login check -> login with or without credentials

  const currentIsoTime = new Date().toISOString();
  const lastCheck = context.bindings.lastCheck[0];

  const FIVE_MINUTES = 60 * 1000 * 15;

  context.log(loginEnabled);

  // Store raw check + puppeteer response
  const rawCheck: IRawCheck = {
    checkId: shortid.generate().toString(),
    isOffline: isOffline,
    loginEnabled: loginEnabled,
    checked: currentIsoTime,
    response: null,
    metrics_start: null,
    metrics_end: null,
    performance: null
  };

  if (response) {
    rawCheck.response = response._headers;
    rawCheck.metrics_end = await page.metrics();
    rawCheck.metrics_start = metricsStart;
    rawCheck.performance = await page.evaluate(() => {
      return JSON.parse(JSON.stringify(performance.toJSON(), null, 2));
    });
  }

  context.bindings.raw = rawCheck;

  // If last check exists and check if isOffline state is equal
  // and last check was not updated longer then 5 minutes ago
  if (
    lastCheck &&
    lastCheck.isOffline === isOffline &&
    lastCheck.loginEnabled === loginEnabled &&
    new Date().getTime() - new Date(lastCheck.lastChecked).getTime() <
      FIVE_MINUTES
  ) {
    // Update lastChecked
    lastCheck.lastChecked = currentIsoTime;
    lastCheck.loginEnabled = loginEnabled;
    lastCheck.isOffline = isOffline;
    context.bindings.check = lastCheck;
  } else {
    // Create new check
    const entity: ICheck = {
      checkId: shortid.generate().toString(),
      isOffline: isOffline,
      loginEnabled: loginEnabled,
      firstChecked: currentIsoTime,
      lastChecked: currentIsoTime
    };

    context.bindings.check = entity;
  }

  await page.close();
  await browser.close();
  context.done();
};

export default timerTrigger;
