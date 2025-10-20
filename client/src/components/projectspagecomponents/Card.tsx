type ChildProps = {
  title: string;
  price: number;
};

export default function Card({ title,price }: ChildProps) {
  return (
    <div className="border-2 rounded-md shadow-lg">
      <h2 className="capitalize border-b-2 p-4 py-3">{title}</h2>
      <h3 className="text-lg font-medium px-4 py-5">
        <span>$</span>{price}
      </h3>
    </div>
  );
}
