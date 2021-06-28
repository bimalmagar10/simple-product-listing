import styled,{createGlobalStyle}from "styled-components";
import Link from "next/link";
import Image from "next/image";
import {motion} from "framer-motion";
import {useAuth} from "../auth";
import Navigation from "../components/Navigation";
 const GlobalStyle = createGlobalStyle`
     *,
     *::after,
     *::before {
      margin:0;
      padding:0;
      box-sizing:inherit;
     }
     html {
      font-size:62.5%;
     }
     body {
      font-family:'Cousine',sans-serif;
      box-sizing:border-box;
      background-color:#EBE7DD;
     }
}
`;
const Grid = styled(motion.div)`
     display:grid;
     grid-template-columns:repeat(3,1fr);
     grid-gap:5rem;
     max-width:70vw;
     grid-template-rows:repeat(2,min-content);
     margin:0 auto;
`;
const ProductItem = styled(motion.a)`
    text-decoration:none;
    color:#1E1B12;
    background-color:#D8D0BD;
    display:inline-block;
    padding:3rem 2rem;
    text-align:center;
    h2 {
      text-align:left;
      font-size:1.6rem;
    }
    > *:not(:last-child) {
      margin-bottom:2rem !important;
    }
`;
const IconWrapper = styled("div")`
    svg {
      fill:orange;
      height:2rem;
      width:2rem;
    }
`;
const Box = styled.div`
  display:flex;
  justify-content:space-between;
  span {
    font-size:2rem;
    fint-weight:700;
  }
`;
const Navbar = styled.div`
  margin:3rem auto;
   max-width:70vw;
   display:flex;
   justify-content:space-between;
   h2 {
    font-size:2.5rem;
    color:#1E1B12;
   }
`;

const fadeInUp = {
  initial:{
    opacity:0,
    y:60
  },
  animate:{
    opacity:1,
    y:0,
    transition:{
      duration:.2,
      ease:[.5,-.01,.6,.99]
    }
  }
};
const stagger = {
  initial:{
    opacity:0,
  },
  animate: {
    opacity:1,
    transition:{
      staggerChildren:.2
    }
  }
};
export default function Home({products}) {
  const {user} = useAuth();
  return (
    <>
      <Navigation/>
      <Grid exit={{opacity:0}} initial="initial" animate="animate" variants={stagger}>
         {
           products.map((product) => (
               <Link key={product.id} href={`/products/${product.id}`} passHref>
                 <ProductItem 
                 variants={fadeInUp}
                 whileHover={{scale:1.05}}
                 whileTap={{scale:.95}}
                 >
                       <Image 
                          src={`/images/${product.img}`} 
                          alt="Product Image"
                          height="100"
                          width="100"
                          blurDataURL={`/images/${product.img}`}
                          placeholder="blur"
                       />
                       <h2>{product.title}</h2>
                       <Box>
                         <span>${product.price}</span>
                         <IconWrapper>
                           {Array(5).fill("").map((_,i) =>(
                                <svg key={i} style={{fill:`${i < product.rating ? "orange" : "#695D3E"}`,}}>
                                    <use href="/images/star.svg#star"></use>
                                </svg>
                            ))}
                         </IconWrapper>
                       </Box>
                 </ProductItem>
              </Link>
           ))
         }
      </Grid>
      </>

  )
}
export async function getStaticProps() {
  const res = await fetch("https://my-json-server.typicode.com/bimalmagar10/demo/products");
  const products = await res.json();
  return {
    props:{products}
  }
}
