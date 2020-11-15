import { TestBed } from '@angular/core/testing';

import { NsfwJsService } from './nsfw-js.service';

describe('NsfwJsService', () => {
  let service: NsfwJsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NsfwJsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
