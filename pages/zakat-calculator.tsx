import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import Link from "next/link";
import { FC, useMemo, useState } from "react";
import ExternalLink from "../components/ExternalLink";
import Head from "../components/Head";
import InputNumber from "../components/InputNumber";
import LayoutWithNavbar from "../components/LayoutWithNavbar";
import NavbarTitle from "../components/NavbarTitle";
import { formatNumber } from "../helpers/number";
import { classNames } from "../helpers/utils";

const ZakatCalculatorPage: NextPage = () => {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);
  const [
    additionalMonthlyIncome,
    setAddittionalMontlyIncome,
  ] = useState<number>(0);
  const [goldPrice, setGoldPrice] = useState<number>(0);
  const [goldAmount, setGoldAmount] = useState<number>(0);

  const incomeZakat = useMemo(() => {
    return Math.round(
      ((monthlyIncome || 0) + (additionalMonthlyIncome || 0)) * (2.5 / 100)
    );
  }, [monthlyIncome, additionalMonthlyIncome]);

  const nishab = useMemo(() => {
    return goldPrice * 85;
  }, [goldPrice]);

  return (
    <LayoutWithNavbar
      navbarTitle={
        <NavbarTitle
          title="Kalkulator Zakat"
          icon="/icon-calculator-zakat.svg"
        />
      }
      leftButton={
        <Link href="/">
          <span>
            <FontAwesomeIcon icon={faArrowLeft} className="cursor-pointer" />
          </span>
        </Link>
      }
      // rightButton={
      //   <span onClick={() => setShowInfo(!showInfo)}>
      //     <FontAwesomeIcon icon={faInfoCircle} className="cursor-pointer" />
      //   </span>
      // }
    >
      <Head
        title="Kalkulator Zakat"
        description="Kalkulator untuk menghitung nishab serta zakat penghasilan"
      />

      <CalculatorCard title="Hitung Nishab">
        <p className="text-gray-500 text-sm border-b mb-3 pb-3">
          Nishab digunakan sebagai acuan apakah seorang Muslim wajib
          mengeluarkan zakat atau tidak. Bersumber dari Al Qur'an Surah Al
          Baqarah ayat 267, Peraturan Menteri Agama Nomer 31 Tahun 2019, Fatwa
          MUI Nomer 3 Tahun 2003, dan pendapat Shaikh Yusuf Qardawi, untuk zakat
          penghasilan dan emas, nishabnya adalah sebesar 85 gram emas dalam satu
          tahun. Untuk zakat penghasilan yang ditunaikan tiap bulan, maka
          nishabnya adalah 1/12 dari 85 gram emas.
        </p>
        <FormGroup label="Harga emas saat ini">
          <InputNumber
            className="text-right pr-16"
            leftIcon={
              <span className="font-semibold select-none text-gray-300">
                Rp
              </span>
            }
            rightIcon={
              <span
                className={classNames([
                  "font-semibold select-none",
                  goldPrice ? "text-secondary" : "text-gray-300",
                ])}
              >
                / gram
              </span>
            }
            bordered
            value={goldPrice}
            onUpdate={(value) => setGoldPrice(value)}
          />
          <p className="text-xs text-gray-500 mt-2">
            Tidak tahu harga emas?{" "}
            <ExternalLink href="https://www.google.com/search?q=gold price per gram in idr">
              klik disini
            </ExternalLink>{" "}
            untuk mencari tahu.
          </p>
        </FormGroup>
        {nishab > 0 && (
          <div className="mt-3 py-3 border-t select-none">
            <div className="grid grid-cols-2">
              <div>
                <h4 className="font-semibold text-oxford-blue">
                  Nishab per tahun
                </h4>
                <div className="text-lg sm:text-2xl font-bold">
                  <span className="text-primary">Rp.</span>{" "}
                  {formatNumber(nishab, "period")}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-oxford-blue">
                  Nishab per bulan
                </h4>
                <div className="text-lg sm:text-2xl font-bold">
                  <span className="text-primary">Rp.</span>{" "}
                  {formatNumber(Math.round(nishab / 12), "period")}
                </div>
              </div>
            </div>
          </div>
        )}
      </CalculatorCard>
      <CalculatorCard title="Zakat Penghasilan">
        <FormGroup label="Penghasilan per bulan">
          <InputNumber
            className="text-right"
            leftIcon={
              <span className="font-semibold select-none text-gray-300">
                Rp
              </span>
            }
            bordered
            value={monthlyIncome}
            onUpdate={(value) => setMonthlyIncome(value)}
          />
        </FormGroup>
        <FormGroup label="Pendapatan lain (jika ada)">
          <InputNumber
            className="text-right"
            leftIcon={
              <span className="font-semibold select-none text-gray-300">
                Rp
              </span>
            }
            bordered
            value={additionalMonthlyIncome}
            onUpdate={(value) => setAddittionalMontlyIncome(value)}
          />
        </FormGroup>
        {incomeZakat > 0 && (
          <div className="mt-3 py-3 border-t select-none">
            <h4 className="font-semibold text-oxford-blue">
              Zakat yang perlu dikeluarkan (per bulan)
            </h4>
            <div className="text-lg sm:text-2xl font-bold">
              <span className="text-primary">Rp.</span>{" "}
              {formatNumber(incomeZakat, "period")}
            </div>
          </div>
        )}
        {incomeZakat > 0 && nishab > 0 && (
          <div className="py-3 border-t select-none">
            <h4 className="font-semibold text-oxford-blue">
              Apakah kamu wajib zakat?
            </h4>
            <div className="text-lg sm:text-2xl font-bold">
              {(monthlyIncome + additionalMonthlyIncome) >= Math.round(nishab / 12) ? (
                <span className="text-primary">YA</span>
              ) : (
                <span className="text-violet-red">TIDAK</span>
              )}
            </div>
          </div>
        )}
      </CalculatorCard>
    </LayoutWithNavbar>
  );
};

export default ZakatCalculatorPage;

const FormGroup: FC<{ label: string }> = ({ label, children }) => (
  <div className="mb-3">
    <span className="text-oxford-blue inline-block mb-2 select-none text-sm">
      {label}
    </span>
    {children}
  </div>
);

const CalculatorCard: FC<{ title: string }> = ({ title, children }) => (
  <div className="mt-3 bg-white rounded">
    <div className="border-b px-3 py-2">
      <h4 className="font-semibold text-oxford-blue">{title}</h4>
    </div>
    <div className="p-3">{children}</div>
  </div>
);
