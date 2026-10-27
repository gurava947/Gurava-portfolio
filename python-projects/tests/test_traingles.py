import unittest

from support import run_solution


class TrainglesTest(unittest.TestCase):
    def test_case_01_3_3_3(self):
        """3, 3, 3."""
        result = run_solution('traingles', '3\n3\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Equilateral\n')

    def test_case_02_5_5_8(self):
        """5, 5, 8."""
        result = run_solution('traingles', '5\n5\n8\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Isosceles\n')

    def test_case_03_3_4_5(self):
        """3, 4, 5."""
        result = run_solution('traingles', '3\n4\n5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Scalene\n')


if __name__ == "__main__":
    unittest.main()
