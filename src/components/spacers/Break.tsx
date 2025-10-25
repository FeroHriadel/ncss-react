export interface BreakProps {
  amount?: number;
}

const Break: React.FC<BreakProps> = ({ amount = 1 }) => {
  return (
    <>
      {Array.from({ length: amount }).map((_, index) => (
        <br key={`break-${index}`} />
      ))}
    </>
  );  
};

export default Break;