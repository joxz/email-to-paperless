import PostalMime from 'postal-mime';

export default {
	async email(message, env, ctx) {
		const raw = await new Response(message.raw).arrayBuffer();
		const parser = new PostalMime();
		const email = await parser.parse(raw);

		if (!email.attachments || email.attachments.length === 0) {
			console.log('No attachments found, skipping.');
			return;
		}

		const title = email.subject || 'Email document';

		await Promise.all(
			email.attachments.map(async (att) => {
				try {
					const blob = new Blob([att.content], {
						type: att.mimeType || 'application/octet-stream',
					});

					const form = new FormData();
					form.append('document', blob, att.filename || 'attachment');
					form.append('title', title);

					const resp = await fetch(`${env.PAPERLESS_URL}/api/documents/post_document/`, {
						method: 'POST',
						headers: {
							'CF-Access-Client-Id': env.CF_ACCESS_CLIENT_ID,
							'CF-Access-Client-Secret': env.CF_ACCESS_CLIENT_SECRET,
							Authorization: env.AUTHTOKEN
						},
						body: form,
					});

					if (!resp.ok) {
						console.error(`Upload failed for ${att.filename}:`, resp.status, await resp.text());
					} else {
						console.log(`Upload successful for ${att.filename}`);
					}
				} catch (err) {
					console.error('Error while processing attachment:', err);
				}
			})
		);
	},
};
