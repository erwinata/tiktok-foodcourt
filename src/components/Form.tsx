import React from "react";

type TOnSubmit1 = () => void;
type TOnSubmit2 = (e: React.FormEvent<HTMLFormElement>) => void;
interface Props {
  onSubmit: TOnSubmit1 | TOnSubmit2;
}

const Form: React.FC<Props> = ({ onSubmit, children }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };

  return <form onSubmit={handleSubmit}>{children}</form>;
};

export default Form;
