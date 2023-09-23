type Props = {
  text: string;
};

export default function Empty({ text }: Props) {
  return (
    <section className="w-full h-[100px] flex justify-center align-center  border-b border-gray-400">
      <p className="text-gray-500 text-sm m-auto">{text}</p>
    </section>
  );
}
