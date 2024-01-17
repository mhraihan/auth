"use server"

import { signOut } from "@/auth"

export const logout = async () => {
    //TODO: I can perform some other tasks before logout
    await signOut();
}