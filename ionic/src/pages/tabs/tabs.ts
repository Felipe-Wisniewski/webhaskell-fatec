import { Component } from '@angular/core';

import { PublicarPage } from '../publicar/publicar';
import { ConfigurarPage } from '../configurar/configurar';
import { FeedPage } from '../feed/feed';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FeedPage;
  tab2Root = PublicarPage;
  tab3Root = ConfigurarPage;

  constructor() {

  }
}
