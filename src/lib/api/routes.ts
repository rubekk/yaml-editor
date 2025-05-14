import { messages } from "../constants/messages"

export const getRoutes = async (): Promise<RoutesResponse | null> => {
    try {
        const res = await fetch(`https://schoolapi.theripplebytes.com/api/v1/me/sys/routes`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
                "Content-Type": "application/json",
            }
        })

        if (!res.ok) {
            return {
                data: null,
                message: messages.MALFORMED_AUTH
            }
        }

        return res.json()
    } catch {
        return null
    }
}

export type Route = {
    method: string;
    path: string;
}

export type Routes = Array<Route>

export type RoutesResponse = {
    data: Routes | null,
    message: string
}