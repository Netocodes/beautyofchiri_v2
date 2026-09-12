"use client"

import {
    BadgeCheckIcon,
    BellIcon,
    CreditCardIcon,
    LogOutIcon,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/app/components/ui/avatar"
import { Button } from "@/app/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import getInitials from "@/lib/ProfileInitials"
import { useLogout } from "@/lib/tanstackQueries/profile/profile"

export function DropdownMenuAvatar({ image, full_name }: { image: string, full_name: string }) {
    const { mutate: logoutMutate, isPending, isError, error } = useLogout()
    console.log(full_name)
    const initials = getInitials(full_name)
    const initiateLogout = () => {
        logoutMutate(undefined, {
            onSuccess: () => {
                alert('Successfully logged out!');
            },
            onError: (err) => {
                alert(err.errorMessage || 'Failed to logout');
            },
        });
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger >
                <Button variant="ghost" size="icon-lg" className="rounded-full"><Avatar>
                    <AvatarImage src={image} alt="Avatar Image" />
                    <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                </Button>
            </DropdownMenuTrigger >

            <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <BadgeCheckIcon />
                        Account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <CreditCardIcon />
                        Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <BellIcon />
                        Notifications
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => initiateLogout()} disabled={isPending}>
                    <LogOutIcon />
                    Log Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu >
    )
}
