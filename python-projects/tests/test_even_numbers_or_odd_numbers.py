import unittest

from support import run_solution


class EvenNumbersOrOddNumbersTest(unittest.TestCase):
    def test_case_01_up_to_three(self):
        """up to three."""
        result = run_solution('even-numbers-or-odd-numbers', '3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0 EVEN\n1 ODD\n2 EVEN\n3 ODD\n')

    def test_case_02_up_to_four(self):
        """up to four."""
        result = run_solution('even-numbers-or-odd-numbers', '4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0 EVEN\n1 ODD\n2 EVEN\n3 ODD\n4 EVEN\n')


if __name__ == "__main__":
    unittest.main()
