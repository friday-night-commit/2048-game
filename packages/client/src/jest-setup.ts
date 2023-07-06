import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';

import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

// Fetch mock
jest
  .spyOn(global, 'fetch')
  .mockImplementation(
    (_input: RequestInfo | URL, _init?: RequestInit | undefined) =>
      Promise.resolve(new Response(''))
  );

// Audio mock
global.AudioContext = jest.fn().mockImplementation(() => ({
  decodeAudioData: jest.fn(() => Promise.resolve(new Response(''))),
}));
