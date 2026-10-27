import unittest

from support import run_solution


class FirstEvenNumberTest(unittest.TestCase):
    def test_case_01_3_7_8_10(self):
        """3, 7, 8, 10."""
        result = run_solution('first-even-number', '4\n3\n7\n8\n10\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '8\n')

    def test_case_02_1_3_5(self):
        """1, 3, 5."""
        result = run_solution('first-even-number', '3\n1\n3\n5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '')


if __name__ == "__main__":
    unittest.main()
