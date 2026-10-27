import unittest

from support import run_solution


class SmallestRemainderTest(unittest.TestCase):
    def test_case_01_10_and_3_tie(self):
        """10 and 3 (tie)."""
        result = run_solution('smallest-remainder', '10\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1\n')

    def test_case_02_7_and_4(self):
        """7 and 4."""
        result = run_solution('smallest-remainder', '7\n4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '3\n')

    def test_case_03_9_and_2(self):
        """9 and 2."""
        result = run_solution('smallest-remainder', '9\n2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1\n')

    def test_case_04_12_and_5(self):
        """12 and 5."""
        result = run_solution('smallest-remainder', '12\n5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2\n')


if __name__ == "__main__":
    unittest.main()
