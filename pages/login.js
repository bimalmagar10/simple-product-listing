import React, {useState} from "react";
import firebaseClient from "../firebaseClient";
import firebase from "firebase/app";
import "firebase/auth";
import {useRouter} from "next/router";
import {WarningIcon,CheckCircleIcon} from "@chakra-ui/icons";
import {
	Text,
	Flex,
	Input,
	FormControl,
	FormLabel,
	Stack,
	Button,
	useToast,
	Heading,
} from "@chakra-ui/react";
import Head from "next/head";
export default function Login() {
	firebaseClient();
	const toast= useToast();
	const router = useRouter();
	const [email,setEmail] = useState("");
	const [pass,setPass] = useState("");
	return (
		<>
			<Head>
				<title>Log In</title>
			</Head>
			<Flex background="gray.800" height="100vh" width="100vw" alignItems="center" justifyContent="center"> 
				<Flex width="30%" direction="column" background="gray.700" p={10} rounded={6}>
					<Heading mb={6} textAlign="center" fontSize="3rem">Log In</Heading>
					<FormControl mb={5} isRequired>
					    <FormLabel fontSize="2rem">Email</FormLabel>
						<Input
						  color="white" 
						  px="1rem"
						  py="2rem"
						  fontSize="1.6rem"
						  placeholder="Enter Email" 
						  type="email"
						  value={email} 
						  variant="filled"
						  onChange={(e) => setEmail(e.target.value)}
						/>
					</FormControl>
					<FormControl  mb={5} isRequired>
					    <FormLabel fontSize="2rem">Password</FormLabel>
						<Input 
						      color="white"
						      px="1rem"
							  py="2rem"
							  fontSize="1.6rem"
							  placeholder="Enter password" 
							  type="password" 
							  value={pass} 
							  variant="filled"
							  mb={6}
							  onChange={(e) => setPass(e.target.value)}
					    />
					</FormControl>
					<Stack direction="row"justify="center" spacing={5}>
						<Button 
						    px="1rem"
							py="2rem"
						    fontSize="1.6rem"
							colorScheme="teal" 
							minWidth="45%"
							onClick ={async () =>{
								await firebase
								.auth()
								.createUserWithEmailAndPassword(email,pass)
								.then(function(firebaseUser){
									toast({
										render:function oh(){ return(
											<Stack fontSize="1.6rem" borderRadius={5} direction="row" bg="green.500" color="white" px="2rem" py="1rem" spacing="15px">
											       <Stack direction="column">
											        <CheckCircleIcon boxSize="2.5rem"/>
												   </Stack>
												    <Stack direction="column">
														<Text>Success!</Text>
														<Text>Your account has been created.Please,wait while we redirect.</Text>
													</Stack>
											</Stack>
										)},
										onCloseComplete: () => {
											router.push("/main");
										}
									})
								})
								.catch(function(err){
									const msg = err.message;
									toast({
										render:function hey(){ return (
											 <Stack fontSize="1.6rem" borderRadius={5} direction="row" bg="red.500" color="white" px="2rem" py="1rem" spacing="15px">
											        <Stack direction="column">
											         <WarningIcon boxSize="2.5rem"/>
											 	   </Stack>
											 	    <Stack direction="column">
											 			<Text>An error occured</Text>
											 			<Text>{msg}</Text>
											 		</Stack>
											 </Stack>
										)}
									})
								})
							}}
							isDisabled={pass === "" || email === ""}
						>
						   Create Account
						</Button>
						<Button
						    px="1rem"
							py="2rem"
						    fontSize="1.6rem" 
							colorScheme="teal"  
							minWidth="45%"
							isDisabled={pass === "" || email === ""}
							onClick = {async () => {
								await firebase
								.auth()
								.signInWithEmailAndPassword(email,pass)
								.then((user) => {
										toast({
										    render:function yello() {return (
												<Stack fontSize="1.6rem" borderRadius={5} direction="row" bg="green.500" color="white" px="2rem" py="1rem" spacing="15px">
												       <Stack direction="column">
												        <CheckCircleIcon boxSize="2.5rem"/>
													   </Stack>
													    <Stack direction="column">
															<Text>Login Success!</Text>
															<Text>You will be logged in about a second.</Text>
														</Stack>
												</Stack>
										    )},
										    onCloseComplete: () => {
											     router.push("/main");
										    }
									    })
								})
								.catch(function(err){
									const msg = err.message;
									toast({
										render:function wuhu(){ return (
											 <Stack fontSize="1.6rem" borderRadius={5} direction="row" bg="red.500" color="white" px="2rem" py="1rem" spacing="15px">
											        <Stack direction="column">
											         <WarningIcon boxSize="2.5rem"/>
											 	   </Stack>
											 	    <Stack direction="column">
											 			<Text>An error occured</Text>
											 			<Text>{msg}</Text>
											 		</Stack>
											 </Stack>
										)}
									})
								})
							}}
						>
							Log In
						</Button>
					</Stack>
				</Flex>
			</Flex>
		</>
		);
}