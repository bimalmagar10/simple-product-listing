import {useState} from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import {motion} from "framer-motion";
import StripeButton from "../../components/StripeButton";
import Navigation from "../../components/Navigation";
import {useAuth} from "../../auth";
import {DEFAULT_PRODUCT} from "../../data/data";
import firebaseClient from "../../firebaseClient";
import firebase from "firebase/app";

const Details = styled(motion.div)`
     height:100vh;
     display:flex;
     align-items:flex-start;
`;
const Left= styled(motion.div)`
  flex:0 0 50%;
  height:100%;
  display:flex;
  justify-content:center;
  align-items:center;
`;
const Right= styled(motion.div)`
   padding:3rem 8rem;
   display:flex;
   flex-direction:column;
   justify-content:center;
   height:100%;
   font-size:2rem;
      > *:not(:last-child) {
         margin-bottom:2rem;
       }
   
   
   a {
    text-decoration:none;
    color:#fff;
   }
   h1 {
      font-size:3rem;
  }
`;
const ReviewBar = styled(motion.div)`
     display:flex;
     align-items:center;
     > *:first-child {
         margin-right:3rem;
     }
     svg {
      fill:orange;
      height:2rem;
      width:2rem;
     }
`;
const ButtonGroup = styled(motion.div)`
  display:flex;
  align-items:center;
  span {
    color:#1E1B12;
    display:flex;
    align-items:center;
    padding:0 2rem;
    align-self:stretch;
    font-size:2rem;
    background-color:#D8D0BD;
  }
`;
const Button = styled(motion.button)`
  font-size:2rem;
  display:inline-block;
  align-self:flex-start;
  outline:none;
  padding:${props => (props.pd)};
  background-color:${props => props.bg};
  border:${props => props.border};
  cursor:pointer;
  transition:all .4s ease;
  :hover {
    background-color:#747463;
    color:#EBE7DD;
  }
`;
const PriceTag = styled(motion.div)`
  font-size:5rem;
`;
const fadeInUp = {
  initial:{
    opacity:0,
    y:60,
    transition:{duration:.5,ease:"easeIn"}
  },
  animate:{
    opacity:1,
    y:0,
    transition:{
      duration:.5,
      ease:[.5,-.01,.6,.99]
    }
  }
};

const stagger = {
	animate:{
		transition:{
			staggerChildren:.02,
			delayChildren:.5
		}
	}
};
const hey ={
	initial:{
		opacity:0
	},
	animate:{
		opacity:1,
        transition:{
        	duration:.5
        }
	} 
};

export default function Product(props){
    firebaseClient();
    const [count,setCount] = useState(1);
    const {user,email} = useAuth();
    //this is default product for next js build when you use 'npm run build'
    //as nextjs expects default value for this and throws an error if not set.
    if(!props.product){
        props.product = DEFAULT_PRODUCT;
    }
	return (
    <>
    <Navigation/>
   <Details exit={{opacity:0,transition:{duration:.5}}} initial="initial" animate="animate" variants={hey}>
       <Left initial={{opacity:0}} animate={{opacity:1}}>
          <motion.div 
          initial={{opacity:0,x:60}} 
          animate={{opacity:1,x:0,transition:{delay:.5,ease:"easeIn"}}}
          >
              <Image
	            src={`/images/${props.product.img}`}
	            alt="Product Image"
	            height="500"
	            width="500"
	            blurDataURL={`/images/${props.product.img}`}
	            placeholder="blur"
              />
         </motion.div>
       </Left>
       <Right variants={stagger}>
         <Link href="/" passHref>
           <motion.a variants={fadeInUp}>&larr;&nbsp;Back</motion.a>
         </Link>
         <motion.h1 variants={fadeInUp}>{props.product.title}</motion.h1>
         <ReviewBar variants={fadeInUp}>
           <span>
               {
                 Array(5).fill("").map((_,i) =>(
                    <svg key={i} style={{fill:`${i < props.product.rating ? "orange" : "#695D3E"}`,}}>
                        <use href="/images/star.svg#star"></use>
                    </svg>
                 ))
               }
           </span>
           <span>{props.product.reviews} Reviews</span>
         </ReviewBar>
         <PriceTag variants={fadeInUp}>${props.product.price * count}</PriceTag>
         <motion.p variants={fadeInUp} style={{fontSize:"1.6rem"}}>
          {props.product.description} 
         </motion.p>
         <ButtonGroup variants={fadeInUp}>
            <Button 
              pd=".8rem 2rem" 
              bg="#D8D0BD" 
              border="none" 
              onClick={() => count === 7 ? setCount(7) :setCount(count+1)}>+</Button>
            <span>{count}</span>
            <Button 
            pd=".8rem 2rem" 
            bg="#D8D0BD" 
            border="none"
            onClick={() => count === 1 ?setCount(1):setCount(count-1)}
            >-</Button>
         </ButtonGroup>
         <p style={{fontSize:"1.2rem",color:"tomato"}}>
            Use <strong>4242424242424242</strong> for  visa card payment and <strong>5555555555554444 </strong> 
            for mastercard payment and future date in the format <strong>01/22</strong> for card expiry and any digits for CVC
         </p>
         {user ? (
               <StripeButton price={props.product.price * count} email={email}>
                   <Button variants={fadeInUp} pd="1rem 2rem" bg="#F1EFE8" border="1px solid #FF6200">
                     Buy Now
                   </Button>
               </StripeButton>
          ):(
             <Link href="/login" passHref>
                 <Button variants={fadeInUp} pd="1rem 2rem" bg="#F1EFE8" border="1px solid #FF6200">
                         Buy Now
                  </Button>
              </Link>
          )}
        
       </Right>
     </Details>
     </>
	);
}


export async function getStaticPaths() {
	const res = await fetch("https://my-json-server.typicode.com/bimalmagar10/demo/products");
	const products = await res.json();

	const paths = products.map(product => ({
		params:{id:String(product.id)}
	}));
	return {paths,fallback:true}
}
export async function getStaticProps({params}) {
    const res = await fetch(`https://my-json-server.typicode.com/bimalmagar10/demo/products/${params.id}`);
    let product = await res.json();
    return  {
    	props:{product}
    }
}