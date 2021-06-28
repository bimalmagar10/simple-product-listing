import {useAuth} from "../auth";
import styled from "styled-components";
import Link from "next/link";
import firebase  from "firebase/app";
import {useRouter} from "next/router";
const Navbar = styled.div`
  margin:3rem auto;
   max-width:70vw;
   display:flex;
   justify-content:space-between;
   h2 {
    font-size:2.5rem;
    color:#fff;
   }
`;
const Button = styled("button")`
   cursor:pointer;
   font-size:1.6rem;
   outline:none;
   border:none;
   background-color:${props => (props.type === "login" ? "teal" :"tomato")};
   padding:1rem 2rem;
   text-align:center;
   margin-left:1rem;
   color:whitesmoke;
   a {
    text-decoration:none;
    color:currentColor;
   }
`;
export default function Navigation() {
	const {user,email,setEmail} = useAuth();
	const router = useRouter();
	return (
		<Navbar>
	       <h2>Bimal&apos;s Product</h2>
	        <div>
	          {user ? (
	              <Button type="signout" onClick={async () => {
	              	await firebase.auth().signOut();
	              	 setEmail(null);
 					         router.push("/");
	              }}>
	               Sign Out
	              </Button>
	            ) : (
	              <Button type="login">
	                 <Link href="/login">
	                   <a>Login</a>
	                 </Link>
	              </Button>
	            )}
	        </div>
      </Navbar>
	);
}