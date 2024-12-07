import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { appConfig } from './app.config';
import { routes } from './app.routes';

describe('appConfig', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...appConfig.providers],
    });
  });

  it('should provide router configuration', () => {
    const router = TestBed.inject(Router);
    expect(router).toBeTruthy();
  });

  it('should provide HTTP client', () => {
    const httpClient = TestBed.inject(HttpClient);
    expect(httpClient).toBeTruthy();
  });

  it('should define application routes', () => {
    expect(routes).toBeDefined();
    expect(routes.length).toBeGreaterThan(0);
  });
});
