import GaussSumStrategy from "./GaussSumStrategy";
import LoopSumSumStrategy from "./LoopSumSumStrategy";
import SumPrinter from "./SumPrinter";

const sumPrinter = new SumPrinter();

const dom1 = document.createElement("h1");
document.body.appendChild(dom1);

const dom2 = document.createElement("h1");
document.body.appendChild(dom2);

sumPrinter.print(new LoopSumSumStrategy(), 100, dom1);
sumPrinter.print(new GaussSumStrategy(), 100, dom2);
