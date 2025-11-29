# email-to-paperless

This project is a Cloudflare Worker that processes incoming emails with attachments and uploads them to a Paperless-NGX service using the Paperless-NGX API. The worker can be integrated with Cloudflare Email Routing to automatically handle incoming emails.

## Features
- Parses incoming emails using `PostalMime`.
- Uploads email attachments to the specified Paperless URL.
- Uses environment variables for configuration, including authentication details.

## Prerequisites
- Node.js installed on your machine.
- Cloudflare account with access to Workers and Email Routing.
- Paperless service running and accessible via the provided URL (e.g., exposed using Cloudflare Tunnels or Pangolin).

## Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/joxz/email-to-paperless.git
   cd email-to-paperless
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
	- Rename `wrangler_example.jsonc` to `wrangler.jsonc`.
   - Update the environment variables in `wrangler.jsonc` with your own values.

4. **Deploy the worker:**
   ```bash
   npx wrangler deploy
   ```

5. **Set up Cloudflare Email Routing:**
   - Configure Cloudflare to route emails to the deployed worker.

## Usage

1. **Send an email with attachments:**
   - Send an email to a configured email address with attachments.
   - The worker will automatically process the incoming email and upload its attachments to the Paperless service.

2. **Check logs for status updates:**
   - Use Cloudflare's dashboard or terminal to monitor logs for successful uploads or errors.

## Contributing

Feel free to contribute by opening issues or submitting pull requests. Make sure to follow the existing code style and add appropriate tests.

## License

This project is licensed under the MIT License.
