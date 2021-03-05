using System;
using System.Linq;
using System.Xml;
using System.Xml.Linq;

namespace Lab_10
{
    class Program
    {
        static void Main(string[] args)
        {
            XmlNode[] arr = new XmlNode[8];
            XmlDocument xml = new XmlDocument();
            xml.Load("arr.xml");
            int i = 0;
            XmlElement xRoot = xml.DocumentElement;
            foreach(XmlNode x in xRoot)
            {
                foreach(XmlNode y in x.ChildNodes)
                {
                    Console.Write($"{y.InnerText} ");
                    arr[i++] = y;
                }
            }
            XmlNode temp;
            for (int k = 0; k < arr.Length; k++)
            {
                for (int j = k + 1; j < arr.Length; j++)
                {
                    if (Convert.ToInt32(arr[k].InnerText) > Convert.ToInt32(arr[j].InnerText))
                    {
                        temp = arr[k];
                        arr[k] = arr[j];
                        arr[j] = temp;
                    }
                }
            }
            var subArr1 = arr.Take(4);
            var subArr2 = arr.Skip(4).Take(4);
            Console.WriteLine();
            Console.WriteLine("-----------Первый подмассив---------");
            foreach (XmlNode x in subArr1)
            {
                Console.Write($"{x.InnerText} ");
            }
            Console.WriteLine();
            Console.WriteLine("------------Второй подмассив----------------");
            foreach (XmlNode x in subArr2)
            {
                Console.Write($"{x.InnerText} ");
            }
        }
    }
}
