import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit
} from '@angular/core';
import ICheck from 'src/app/types/check';

// TODO: Add partial loading

@Component({
  selector: 'app-infinite-list',
  templateUrl: './infinite-list.component.html',
  styleUrls: ['./infinite-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class InfiniteListComponent implements OnInit, OnChanges {
  @Input() listItems: ICheck[] | null = null;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {}

  public calcDowntime(fromString: string, toString: string): number {
    const from = new Date(fromString);
    const to = new Date(toString);

    return (to.getTime() - from.getTime()) / 1000 / 60;
  }
}
