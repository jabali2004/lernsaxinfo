import { AzureFunction, Context, HttpRequest } from '@azure/functions';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.res = {
    status: 200,
    body:
      context.bindings.latestCheck && context.bindings.latestCheck.length > 0
        ? context.bindings.latestCheck[0]
        : {}
  };

  context.done();
};

export default httpTrigger;
