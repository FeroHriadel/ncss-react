



export function useToast() {

    function showToast(message: string, type: 'error' | 'info' = 'info', duration: number = 3000) { 
        const toastContainerId = 'toast-container';
        let container = document.getElementById(toastContainerId);
        if (!container) {
            container = document.createElement('div');
            container.id = toastContainerId;
            container.style.position = 'fixed';
            container.style.bottom = '20px';
            container.style.right = '20px';
            container.style.zIndex = '9999';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.innerText = message;
        toast.style.marginBottom = '10px';
        toast.style.padding = '10px 20px';
        toast.style.borderRadius = '5px';
        toast.style.color = '#fff';
        toast.style.minWidth = '200px';
        toast.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
        toast.style.opacity = '0.9';
        toast.style.transition = 'opacity 0.5s ease';

        switch (type) {
            case 'error':
                toast.style.backgroundColor = 'var(--nc-toast-error-bg)';
                toast.style.color = 'var(--nc-toast-error-text)';
                toast.style.border = '1px solid var(--nc-toast-error-border)';
                toast.style.boxShadow = 'var(--nc-toast-shadow)';
                break;
            case 'info':
            default:
                toast.style.backgroundColor = 'var(--nc-toast-bg)';
                toast.style.color = 'var(--nc-toast-text)';
                toast.style.border = '1px solid var(--nc-toast-border)';
                toast.style.boxShadow = 'var(--nc-toast-shadow)';
                break;
        }

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                container?.removeChild(toast);
                if (container && container.children.length === 0) {
                    document.body.removeChild(container);
                }
            }, 500);
        }, duration);
    }

    
    return { showToast };
}