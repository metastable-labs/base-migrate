import classNames from "classnames";

const Container = ({
  classes,
  variant = "home",
  children,
}: {
  variant?: "home" | "dash";
  classes?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={classNames(classes, {
        "bg-white-100": variant === "home",
        "bg-white-50": variant === "dash",
      })}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 xl:px-20 relative">
        {children}
      </div>
    </div>
  );
};

export default Container;
