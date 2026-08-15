import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import { useT } from "@/i18n";
import SectionHeader from "./SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface SocialProofSectionProps {
  onOpenForm?: () => void;
}

const SocialProofSection = ({ onOpenForm }: SocialProofSectionProps) => {
  const { t } = useT();
  const shouldReduceMotion = useReducedMotion();

  const plans = [1, 2, 3].map((n) => ({
    name: t(`sp.col.${n}.name`),
    price: t(`sp.col.${n}.price`),
    highlighted: n === 3,
  }));

  const rows = [1, 2, 3, 4].map((f) => ({
    label: t(`sp.feature.${f}`),
    cells: [1, 2, 3].map((n) => ({
      included: t(`sp.col.${n}.f.${f}.ok`) === "1",
      detail: t(`sp.col.${n}.f.${f}`),
    })),
  }));

  return (
    <section aria-label={`${t("sp.title.1")} ${t("sp.title.2")}`} className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeader
          eyebrow={t("sp.eyebrow")}
          title={<>{t("sp.title.1")} <span className="text-primary">{t("sp.title.2")}</span></>}
          description={t("sp.desc")}
          className="mb-14"
        />

        <motion.div
          className="relative"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ── Desktop table (sm+) ── */}
          <div className="hidden sm:block rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden">
            <Table className="table-fixed text-sm">
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="w-[26%] border-b border-white/10 bg-background align-bottom" />
                  {plans.map((plan) => (
                    <TableHead
                      key={plan.name}
                      className={cn(
                        "relative border-b border-white/10 text-center align-bottom",
                        plan.highlighted && "bg-primary/[0.06]",
                      )}
                    >
                      <div className="flex flex-col items-center gap-1 py-3">
                        {plan.highlighted && (
                          <Badge className="btn-framer mb-1 !inline-flex whitespace-nowrap !px-3 !py-1 !text-[10px] uppercase tracking-[0.14em]">
                            {t("sp.recommended")}
                          </Badge>
                        )}
                        <span className={cn("text-sm font-semibold", plan.highlighted ? "text-primary" : "text-white")}>
                          {plan.name}
                        </span>
                        <span className="text-xs text-white/50">{plan.price}</span>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.label} className="border-white/10">
                    <TableCell className="py-3 text-xs font-semibold uppercase tracking-[0.1em] text-white/60">
                      {row.label}
                    </TableCell>
                    {row.cells.map((cell, i) => (
                      <TableCell
                        key={`${row.label}-${plans[i].name}`}
                        className={cn("py-3 text-center align-top", plans[i].highlighted && "bg-primary/[0.04]")}
                      >
                        <div className="flex flex-col items-center gap-1.5">
                          {cell.included
                            ? <Check aria-hidden="true" className="size-4 shrink-0 text-primary" strokeWidth={2} />
                            : <X aria-hidden="true" className="size-4 shrink-0 text-white/25" strokeWidth={2} />}
                          <span className={cn("text-xs leading-snug", cell.included ? "text-white/70" : "text-white/35")}>
                            {cell.detail}
                          </span>
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableCell />
                  {plans.map((plan) => (
                    <TableCell key={`cta-${plan.name}`} className={cn("py-4 text-center", plan.highlighted && "bg-primary/[0.04]")}>
                      {plan.highlighted && (
                        <button type="button" onClick={onOpenForm} className="btn-framer !inline-flex w-full !px-4 !py-2.5 !text-xs">
                          {t("pri.cta")}
                          <ArrowRight className="size-3.5" />
                        </button>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* ── Mobile cards (< sm) ── */}
          <div className="flex flex-col gap-4 sm:hidden">
            {plans.map((plan, pi) => (
              <div
                key={plan.name}
                className={cn(
                  "rounded-2xl border p-5",
                  plan.highlighted
                    ? "border-primary/40 bg-primary/[0.06]"
                    : "border-white/10 bg-white/[0.02]",
                )}
              >
                {/* Card header */}
                <div className="mb-4 flex flex-col gap-1">
                  {plan.highlighted && (
                    <Badge className="btn-framer mb-1 !inline-flex self-start whitespace-nowrap !px-3 !py-1 !text-[10px] uppercase tracking-[0.14em]">
                      {t("sp.recommended")}
                    </Badge>
                  )}
                  <span className={cn("text-[15px] font-bold leading-tight", plan.highlighted ? "text-primary" : "text-white")}>
                    {plan.name}
                  </span>
                  <span className="text-xs text-white/50">{plan.price}</span>
                </div>

                {/* Feature rows */}
                <div className="flex flex-col divide-y divide-white/[0.06]">
                  {rows.map((row) => {
                    const cell = row.cells[pi];
                    return (
                      <div key={row.label} className="flex items-start gap-3 py-3">
                        <div className="mt-0.5 flex-shrink-0">
                          {cell.included
                            ? <Check className="size-4 text-primary" strokeWidth={2} />
                            : <X className="size-4 text-white/25" strokeWidth={2} />}
                        </div>
                        <div className="flex flex-col gap-0.5 min-w-0">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/40">
                            {row.label}
                          </span>
                          <span className={cn("text-[13px] leading-snug", cell.included ? "text-white/80" : "text-white/35")}>
                            {cell.detail}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* CTA */}
                {plan.highlighted && (
                  <button
                    type="button"
                    onClick={onOpenForm}
                    className="btn-framer mt-5 !inline-flex w-full !px-4 !py-3 !text-sm"
                  >
                    {t("pri.cta")}
                    <ArrowRight className="size-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofSection;
