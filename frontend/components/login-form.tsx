import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");


	
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("Form submitted");

		if (!email || !password) {
			console.error("Email and password are required");
			return;
		}

		
		
		console.log({ email, password });
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Welcome back</CardTitle>
					<CardDescription>Login with your email and password</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<Input
									id="email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="m@example.com"
									required
								/>
							</Field>
							<Field>
								<div className="flex items-center">
									<FieldLabel htmlFor="password">Password</FieldLabel>
								</div>
								<Input
									id="password"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</Field>
							<Field>
								<Button type="submit">Login</Button>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
