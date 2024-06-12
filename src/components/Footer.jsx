import React from "react";

function Footer() {
  return (
    <div className=" absolute bottom-0">
      <footer className=" text-gray py-4">
        <div className="container mx-auto text-center text-xs ml-5 mt-10">
          <p>
            &copy; {new Date().getFullYear()} Viki Ade Safaat. All rights
            reserved. | Email: vikiade00@gmail.com | Phone: 085861617647
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
