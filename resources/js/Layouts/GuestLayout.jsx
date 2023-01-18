import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';

export default function Guest({ children }) {
    return (
        <div className="flex"
            style={{"backgroundColor": '#252525', minHeight: '100vh'}}>
            <div className="p-3 pt-6 text-center">
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="">
                {children}
            </div>
        </div>
    );
}
