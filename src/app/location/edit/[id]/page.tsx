"use client";
interface Props {
  params: { id: string };
}

const EditLocation = ({ params }: Props) => {
  return <div>{params.id} konumu düzenle</div>;
};

export default EditLocation;
