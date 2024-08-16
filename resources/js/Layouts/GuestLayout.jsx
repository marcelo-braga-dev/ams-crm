import ApplicationLogo from '@/Components/ApplicationLogo';
import {Link, usePage} from '@inertiajs/react';

export default function Guest({ children }) {
    const {app_settings} = usePage().props;
    return (
        <div className="flex"
            style={{"backgroundColor": app_settings.bg_color, minHeight: '100vh'}}>
            <div className="p-3 pt-6 text-center">
                <Link href="/">
                    <img src={app_settings.logo} style={{maxWidth: 200}}></img>
                    {/*<ApplicationLogo className="w-20 h-20 fill-current text-gray-500"/>*/}
                </Link>
            </div>

            <div className="">
                {children}
            </div>
        </div>
    );
}
