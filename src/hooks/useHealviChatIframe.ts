import { useEffect, useState } from 'react';
import { HEALVI_API_BASE_URL } from '../consts/healvi';

interface SignedLoginUrlResponse {
        data?: {
                url?: string;
        };
}

export default function useHealviChatIframe() {
        const [iframeLink, setIframeLink] = useState<string>();

        useEffect(() => {
                async function load() {
                        try {
                                const response = await fetch(
                                        `${HEALVI_API_BASE_URL}/auth/signed-login-url`
                                );

                                if (!response.ok) {
                                        throw new Error(
                                                `Failed to fetch HealviChat URL (${response.status})`
                                        );
                                }

                                const body: SignedLoginUrlResponse =
                                        await response.json();
                                setIframeLink(body.data?.url);
                        } catch (error) {
                                console.error('Error fetching HealviChat URL', error);
                                setIframeLink(undefined);
                        }
                }

                load();
        }, []);

        return { iframeLink };
}
