import { isSSLOrigin, isValidOrigin } from '../../../src/auth/utils/origin';

describe('isValidOrigin', () => {
	test.each([
		// Valid origins
		['http://example.com', true],
		['https://example.com', true],
		['http://www.example.com', true],
		['https://subdomain.example.com', true],
		['http://example.com:8080', true],
		['https://example.com:443', true],
		['http://localhost', true],
		['http://localhost:3000', true],
		['https://localhost:8080', true],
		['http://127.0.0.1', true],
		['http://127.0.0.1:8000', true],

		// Invalid origins
		['http://example.com/path', false],
		['https://example.com/path/to/resource', false],
		['http://example.com:8080/path', false],
		['ftp://example.com', false],
		['example.com', false],
		['http:/example.com', false],
		['https:example.com', false],
		['http://', false],
		['https://', false],
		['localhost', false],
		['http:localhost', false],
		['https://localhost:', false],
		['http://127.0.0.1:', false],
		['https://.com', false],
		['http://example.', false],
		['https://example.com:abc', false],
		['http:// example.com', false],
		['https://exam ple.com', false],
		['http://exa mple.com:8080', false],
		['https://example.com:8080:8081', false],
		['http://example.com:80:80', false],
		['https://.example.com', false],
		['http://example..com', false],
		['https://exam_ple.com', false],
		['https://example.com?query=param', false],
		['https://example.com:80/path#fragment', false],
		['yea, I am not a origin, so?', false],
		[undefined, false],
		['', false],
	] as [string, boolean][])('validates origin %s as %s', (origin, expected) => {
		expect(isValidOrigin(origin)).toBe(expected);
	});
});

describe('isSSLOrigin', () => {
	test.each([
		['https://some-app.com', true],
		['http://localhost', false],
		['http://localhost:3000', false],
		['https:// some-app.com', false],
		['https://some-app.com:', false],
		[undefined, false],
		['', false],
	])('check origin SSL %s status as %s', (origin, expected) => {
		expect(isSSLOrigin(origin)).toBe(expected);
	});
});
