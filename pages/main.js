import nookies from "nookies";
import {useRouter} from "next/router";
import { verifyIdToken } from "../firebaseAdmin";
import firebaseClient from "../firebaseClient";
import {useAuth} from "../auth";
import firebase from "firebase/app";
import Head from "next/head";
import { 
  Center,
  Box, 
  Flex, 
  Text,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from "@chakra-ui/react";


export default function Success({ session }) {
  firebaseClient();
  const {email,setEmail} = useAuth();
  const router = useRouter();
  const updateEmail = (e) => {
    e.preventDefault();
    setEmail(session);
    router.push("/");
  };
  if (session) {
    return (
      <>
          <Head>
            <title>Login success!</title>
          </Head>
          <Center height="100vh">
              <Flex justifyContent="center" alignItems="center" direction="column">
                <Alert
                  status="success"
                  variant="subtle"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                  height="200px"
                  px="3rem"
                  borderRadius="10px"
                >
                  <AlertIcon boxSize="40px" mr={0} />
                  <AlertTitle mt={4} fontSize="2rem" mb="2rem">
                    Login Successful!
                  </AlertTitle>
                  <AlertDescription fontSize="1.6rem" mb="2rem">
                    {}Please! click on the following button to proceed
                  </AlertDescription>
                  <Button colorScheme="blue" fontWeight={300} px="2rem" py="2rem" border="none" fontSize="2rem" onClick={updateEmail}>Proceed</Button>
                </Alert>
              </Flex>
          </Center>
      </>
    );
  } else {
    return (
      <>
        <Head>
              <title>Login Fail!</title>
        </Head>
        <Box>
          <Text>You have to Login to continue!!!</Text>
        </Box>
      </>
    );
  }
}


export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { uid, email } = token;
    return {
      props: { session:email},
    };
  } catch (err) {
    context.res.writeHead(302, { Location: "/login" });
    context.res.end();
    return { props: {} };
  }
}