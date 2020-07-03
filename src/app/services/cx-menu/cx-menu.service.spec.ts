import { TestBed } from '@angular/core/testing';

import { CxMenuService } from './cx-menu.service';

describe('CxMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CxMenuService = TestBed.get(CxMenuService);
    expect(service).toBeTruthy();
  });
});
