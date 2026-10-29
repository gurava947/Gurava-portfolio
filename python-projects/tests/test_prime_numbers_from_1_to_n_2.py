import unittest

from support import run_solution


class PrimeNumbersFrom1ToN2Test(unittest.TestCase):
    def test_case_01_up_to_ten(self):
        """up to ten."""
        result = run_solution('prime-numbers-from-1-to-n-2', '10\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2 3 5 7 \n')

    def test_case_02_up_to_twenty(self):
        """up to twenty."""
        result = run_solution('prime-numbers-from-1-to-n-2', '20\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2 3 5 7 11 13 17 19 \n')


if __name__ == "__main__":
    unittest.main()
