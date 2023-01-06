import { createNavigationContainerRef } from '@react-navigation/native';

export const GlobalNavigationRef = createNavigationContainerRef()

export function GlobalNavigate(name: any, params: any) {
    if (GlobalNavigationRef.isReady()) {
        GlobalNavigationRef.navigate(name as never, params as never);
    }
}