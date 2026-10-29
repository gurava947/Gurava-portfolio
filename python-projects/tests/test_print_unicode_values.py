import unittest

from support import run_solution


class PrintUnicodeValuesTest(unittest.TestCase):
    def test_case_01_ey(self):
        """Hey."""
        result = run_solution('print-unicode-values', 'Hey\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '72\n101\n121\n')

    def test_case_02_i_5(self):
        """Hi 5."""
        result = run_solution('print-unicode-values', 'Hi 5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '72\n105\n32\n53\n')


if __name__ == "__main__":
    unittest.main()
