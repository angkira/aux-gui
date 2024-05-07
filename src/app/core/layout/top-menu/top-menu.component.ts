import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopMenuComponent {}
