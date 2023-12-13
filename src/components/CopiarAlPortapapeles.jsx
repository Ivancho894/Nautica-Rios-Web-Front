import React from "react";
import copy from "clipboard-copy";
import { Toaster, toast } from "sonner";
const CopiarAlPortapapeles = ({ texto }) => {
  const handleClick = () => {
    copy(texto);
    toast.success("", {
      description: (
        <span className="text-green-700 text-base">
          Texto copiado al portapapeles
        </span>
      ),
    });
    // alert("Texto copiado al portapapeles");
  };

  return (
    <>
      <Toaster />
      <span style={{ cursor: "pointer" }} onClick={handleClick}>
        {texto}
      </span>
    </>
  );
};

export default CopiarAlPortapapeles;
