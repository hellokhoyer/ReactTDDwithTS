import type { Stats as StatsType } from "../lib/types";
import H2 from "./H2";

type StatsProps = {
  stats: StatsType;
};

type StatProps = {
  number: number;
  type: string;
};

export default function Stats({ stats }: StatsProps) {
  return (
    <section className="stats">
      <Stat number={stats.numberOfWords} type="Words" />
      <Stat number={stats.numberOfCharacters} type="Characters" />
      <Stat number={stats.instagramCharactersLeft} type="Instagram" />
      <Stat number={stats.facebookCharactersLeft} type="Facebook" />
    </section>
  );
}

function Stat({ number, type }: StatProps) {
  return (
    <section className="stat">
      <span
        className={`stat__number ${number < 0 ? "stat__number--limit" : ""}`}
      >
        {number}
      </span>

      <H2>{type}</H2>
    </section>
  );
}
