export type Component1Props = {
  save_time_ensure_accuracy: string;
  automate_standardize_and_control: string;
};
export function Component1(props: Component1Props) {
  const { save_time_ensure_accuracy, automate_standardize_and_control } = props;
  return (
    <div>
      <div data-testid="sh3bas" className="bg-white opacity-100 overflow-hidden flex flex-col items-center gap-10 max-w-[1021px] w-full min-h-[347px] pt-[4.875rem] pb-[4.938rem] px-[11.813rem]">
        <p data-testid="c3e9a7" className="text-black opacity-100 text-[2rem] font-bold align-top leading-[2.688rem] tracking-normal max-w-[643px] mb-0 font-futura">
          {automate_standardize_and_control}
        </p>
        <p data-testid="jj3id3" className="text-brushed-metal opacity-100 text-2xl font-medium align-top leading-8 tracking-normal max-w-[643px] font-futura">
          {save_time_ensure_accuracy}
        </p>
      </div>
    </div>
  );
}
