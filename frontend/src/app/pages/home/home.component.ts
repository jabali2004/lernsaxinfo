import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { StatusCheckService } from 'src/app/services/status-check.service';
import ICheck from 'src/app/types/check';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private intervalSubscription: Subscription | null = null;

  public isOffline: boolean | undefined = undefined;
  public loginEnabled: boolean | undefined = undefined;

  public lastUpdate: Date | undefined;
  public latestCheck: ICheck | null = null;

  public last30Days: ICheck[] | null = null;
  public last7Days: ICheck[] | null = null;
  public lastDay: ICheck[] | null = null;
  public lastYear: ICheck[] | null = null;

  constructor(
    private statusCheckService: StatusCheckService,
    @Inject(PLATFORM_ID) public platformId: string
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getLatestCheck();
      this.tabSelectionHandler(0);

      const source = interval(40000);
      this.intervalSubscription = source.subscribe(() => {
        this.isOffline = undefined;
        this.getLatestCheck();
      });
    }
  }

  public reload(): void {
    this.getLatestCheck();
  }

  public async tabSelectionHandler($event: number): Promise<void> {
    if (isNaN($event)) {
      return;
    }

    switch ($event) {
      case 0:
        this.lastDay = await this.fetchData(1);
        break;

      case 1:
        this.last7Days = await this.fetchData(7);
        break;

      case 2:
        this.last30Days = await this.fetchData(30);
        break;

      case 3:
        this.lastYear = await this.fetchData(365);
        break;

      default:
        break;
    }
  }

  /**
   * Return latest check
   */
  private async getLatestCheck(): Promise<void> {
    this.latestCheck = await this.statusCheckService.getLatestCheck();
    this.lastUpdate = new Date();

    if (this.latestCheck && this.latestCheck.isOffline !== undefined) {
      this.isOffline = this.latestCheck.isOffline;
      this.loginEnabled = this.latestCheck.loginEnabled;

      this.lastUpdate = new Date(this.latestCheck.lastChecked);
    }
  }

  /**
   * Fetch last data within given days
   */
  private async fetchData(days: number): Promise<ICheck[]> {
    if (isNaN(days)) {
      return [];
    }

    const from = new Date();
    const to = new Date();
    from.setDate(from.getDate() - days);

    const data: ICheck[] = await this.statusCheckService.getIncidentsByTimeRange(
      from,
      to
    );

    return data;
  }

  ngOnDestroy(): void {
    if (this.intervalSubscription !== null) {
      this.intervalSubscription.unsubscribe();
    }
  }
}
