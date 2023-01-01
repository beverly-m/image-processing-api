import supertest from 'supertest';
import app from '../index';

const req = supertest(app);

// Test /api/images endpoint
describe('1. Test /api/images endpoint responses', () => {
    describe('1.1. Test successful api requests', () => {
        it('1.1.1. Gets api endpoint', async () => {
            const res = await req.get(
                '/api/images?image=fjord&width=400&height=200'
            );
            expect(res.status).toBe(200);
        });

        it('1.1.2. Sends image file', async () => {
            const res = await req.get(
                '/api/images?image=fjord&width=400&height=200'
            );
            expect(res.type).toBe('image/jpeg');
        });
    });

    describe('1.2. Test failed api request', () => {
        it('1.2.1. Sends error status code for missing or invalid query parameters', async () => {
            const res = await req.get('/api/images?width=400&height=200');
            expect(res.status).toBe(400);
        });

        it('1.2.2. Sends error message for missing or invalid query parameters', async () => {
            const res = await req.get('/api/images?width=400&height=200');
            expect(res.text).toEqual('Invalid URL parameters sent');
        });

        it('1.2.3. Sends error status code for image name that does not exist', async () => {
            const res = await req.get(
                '/api/images?image=checkvalidity&width=400&height=200'
            );
            expect(res.status).toBe(404);
        });

        it('1.2.4. Sends error message for image name that does not exist', async () => {
            const res = await req.get(
                '/api/images?image=checkvalidity&width=400&height=200'
            );
            expect(res.text).toEqual('Image file name does not exist');
        });
    });
});
