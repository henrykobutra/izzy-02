"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { useUser } from "@/hooks/use-user"
import { useUpdateFullName } from '@/hooks/users/useUpdateFullName'
import { useChangePassword } from '@/hooks/users/useUpdatePassword'

const profileFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "Name must not be longer than 50 characters." }),
  email: z.string().email().min(1),
})

const passwordFormSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type ProfileFormValues = z.infer<typeof profileFormSchema>
type PasswordFormValues = z.infer<typeof passwordFormSchema>

export default function AccountPage() {
  const { setFullName, updateFullName, loading: updatingName, message } = useUpdateFullName()
  const { 
    oldPassword, setOldPassword, 
    newPassword, setNewPassword, 
    confirmPassword, setConfirmPassword, 
    updatePassword, 
    loading: updatingPassword, 
    message: passwordMessage 
  } = useChangePassword()

  const { user, loading: loadingUser } = useUser()

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  })

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  useEffect(() => {
    if (!loadingUser && user) {
      profileForm.reset({ fullName: user.name, email: user.email })
    }
  }, [loadingUser, user, profileForm])

  async function onProfileSubmit(data: ProfileFormValues) {
    setFullName(data.fullName)
    await updateFullName()
    // No need to call router.refresh() here as it's already done in the hook
  }

  async function onPasswordSubmit(data: PasswordFormValues) {
    setOldPassword(data.currentPassword);
    setNewPassword(data.newPassword);
    setConfirmPassword(data.confirmPassword);
    
    await updatePassword();
    
    if (!passwordMessage?.includes('error') && !passwordMessage?.includes('failed') && !passwordMessage?.includes('incorrect')) {
      passwordForm.reset();
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-4">
      <h1 className="text-3xl font-bold">Account Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your account profile information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...profileForm}>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                profileForm.handleSubmit(onProfileSubmit)(e)
              }}
              className="space-y-6"
            >
              <FormField
                control={profileForm.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      {loadingUser ? (
                        <Skeleton className="h-10 w-full" />
                      ) : (
                        <Input placeholder="Your name" {...field} />
                      )}
                    </FormControl>
                    <FormDescription>
                      This is the name that will be displayed on your profile.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={profileForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      {loadingUser ? (
                        <Skeleton className="h-10 w-full" />
                      ) : (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Input
                              placeholder="example@email.com"
                              {...field}
                              disabled
                            />
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            Email updates are temporarily unavailable. Please
                            contact support to change your email address.
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </FormControl>
                    <FormDescription>
                      Your email address is used for login and notifications.
                      Contact support to change your email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                disabled={updatingName || loadingUser}
                onClick={() => {
                  if (!updatingName && !loadingUser) {
                    profileForm.handleSubmit(onProfileSubmit)()
                  }
                }}
              >
                {updatingName ? "Saving..." : "Save changes"}
              </Button>
              {message && (
                <p className={`text-sm mt-2 ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
                  {message}
                </p>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password to maintain account security
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...passwordForm}>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                passwordForm.handleSubmit(onPasswordSubmit)(e)
              }}
              className="space-y-6"
            >
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        type="password"
                        {...field}
                        value={oldPassword}
                        onChange={(e) => {
                          field.onChange(e);
                          setOldPassword(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        type="password"
                        {...field}
                        value={newPassword}
                        onChange={(e) => {
                          field.onChange(e);
                          setNewPassword(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Password must be at least 8 characters long.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        type="password"
                        {...field}
                        value={confirmPassword}
                        onChange={(e) => {
                          field.onChange(e);
                          setConfirmPassword(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                disabled={updatingPassword}
                onClick={() => {
                  if (!updatingPassword) {
                    passwordForm.handleSubmit(onPasswordSubmit)()
                  }
                }}
              >
                {updatingPassword ? "Updating..." : "Update password"}
              </Button>
              
              {passwordMessage && (
                <p className={`text-sm mt-2 ${passwordMessage.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
                  {passwordMessage}
                </p>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Once you delete your account, there is no going back. All your data
            will be permanently removed from our servers.
          </p>
        </CardContent>
        <CardFooter>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Please contact henrykobutra@gmail.com with your account email and your account will be deleted in 24 hours.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive hover:bg-destructive/90"
                  onClick={() => {
                    // In a real app, you would delete the account via an API call here
                    console.log("Account deleted")
                  }}
                >
                  Understood
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  )
}