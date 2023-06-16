'use client'
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Tooltip } from "react-tooltip";


const Nav = () => {
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const getProvidersData = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        getProvidersData();
    }, []);



    return (
        <nav
            className="flex-between w-full mb-16 pt-3"
        >
            <Link
                href="/"
                className="flex gap-2 flex-center"
            >
                <Image src="/assets/images/logo_v1.png"
                    alt="logo"
                    width={50}
                    height={50}
                    data-tooltip-content="Home"
                    data-tooltip-placement="bottom"
                    data-tooltip-id="home"
                    className="object-contain cursor-pointer shadow-md rounded-md"

                />
                <Tooltip id="home" />
                <p className="text-2xl font-bold">AIPrompts</p>
            </Link>




            {/* Desktop navigation */}
            <div
                className="sm:flex hidden"
            >
                {
                    session === undefined ? (
                        <>
                            <button disabled type="button" className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-2 focus:ring-gray-700 focus:text-gray-700 dark:bg-white dark:text-gray-700 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                                </svg>
                                Loading...
                            </button></>
                    ) :
                        session?.user ?
                            (<div
                                className="flex gap-3 md:gap-5"
                            >
                                <Link
                                    href="/create-prompt"
                                    className="black_btn"
                                >
                                    Create Post
                                </Link>
                                <button
                                    type="button"
                                    onClick={
                                        () => {
                                            signOut();
                                            router.push('/');
                                        }

                                    }
                                    className="outline_btn"
                                >
                                    Sign Out
                                </button>


                                <Link
                                    href="profile">
                                    <Image src={session?.user.image}
                                        alt="profile"
                                        data-tooltip-content="My Profile"
                                        data-tooltip-placement="bottom"
                                        data-tooltip-id="profile"
                                        width={30}
                                        height={30}
                                        className="object-contain cursor-pointer shadow-md rounded-md"
                                    />

                                </Link>
                                <Tooltip id="profile" />
                            </div>
                            )
                            :
                            (<>
                                {
                                    providers && Object.values(providers).map((provider) => (
                                        <button
                                            key={provider.name}
                                            type="button"
                                            onClick={() => signIn(provider.id)

                                            }
                                            className="black_btn shadow-md "
                                        >
                                            Sign in with {provider.name}
                                        </button>
                                    ))}
                            </>)

                }

            </div>
            {/* Mobile Navigation */}
            <div
                className="sm:hidden flex relative"
            >
                {session?.user ? (
                    <div className="flex">
                        <Image src={session?.user.image}
                            alt="profile"
                            width={30}
                            height={30}
                            className="object-contain cursor-pointer"
                            onClick={() => setToggleDropdown((prevState) => !prevState)}
                        />

                        {toggleDropdown && (
                            <div
                                className="dropdown"
                            >
                                <Link
                                    href='/profile'
                                    className="dropdown_link "
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <span className="divide-y-2 border-b border-gray-400  w-full"></span>
                                <Link
                                    href='/create-prompt'
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Post
                                </Link>
                                <span className="divide-y-2 border-b border-gray-400  w-full"></span>
                                <button
                                    type="button"
                                    onClick={() => {
                                        signOut();
                                        setToggleDropdown(false);
                                        router.push('/');
                                    }}
                                    className="mt-3 w-full black_btn"
                                >
                                    Sign Out
                                </button>

                            </div>)}


                    </div>
                ) : (<>
                    {
                        providers && Object.values(providers).map((provider) => (
                            <button
                                key={provider.name}
                                type="button"
                                onClick={() => signIn(provider.id)}
                                className="black_btn"
                            >
                                Sign in with {provider.name}
                            </button>
                        ))}
                </>)}

            </div>

        </nav >
    )
}

export default Nav