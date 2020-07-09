import { TestBed } from '@angular/core/testing';

import { UrlconfigService } from './urlconfig.service';

describe('UrlconfigService', () => {
  let service: UrlconfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlconfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
