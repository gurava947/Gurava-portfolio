import unittest

from support import run_solution


class FindTheRemainderTest(unittest.TestCase):
    def test_case_01_17_divided_by_5(self):
        """17 divided by 5."""
        result = run_solution('find-the-remainder', '17\n5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2\n')

    def test_case_02_100_divided_by_7(self):
        """100 divided by 7."""
        result = run_solution('find-the-remainder', '100\n7\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2\n')

    def test_case_03_9_divided_by_3(self):
        """9 divided by 3."""
        result = run_solution('find-the-remainder', '9\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0\n')

    def test_case_04_45_divided_by_8(self):
        """45 divided by 8."""
        result = run_solution('find-the-remainder', '45\n8\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '5\n')


if __name__ == "__main__":
    unittest.main()
