import unittest

from support import run_solution


class FindTheGroup2Test(unittest.TestCase):
    def test_case_01_1(self):
        """1."""
        result = run_solution('find-the-group-2', '1\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Group 1\n')

    def test_case_02_5(self):
        """5."""
        result = run_solution('find-the-group-2', '5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Group 5\n')

    def test_case_03_6(self):
        """6."""
        result = run_solution('find-the-group-2', '6\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Group 6\n')

    def test_case_04_7(self):
        """7."""
        result = run_solution('find-the-group-2', '7\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Group 1\n')


if __name__ == "__main__":
    unittest.main()
