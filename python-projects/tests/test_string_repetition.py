import unittest

from support import run_solution


class StringRepetitionTest(unittest.TestCase):
    def test_case_01_hi_twice(self):
        """Hi twice."""
        result = run_solution('string-repetition', 'Hi\n2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Hi Hi \n')

    def test_case_02_abc_once(self):
        """abc once."""
        result = run_solution('string-repetition', 'abc\n1\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'abc \n')

    def test_case_03_hi_three_times(self):
        """Hi three times."""
        result = run_solution('string-repetition', 'Hi\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Hi Hi Hi \n')


if __name__ == "__main__":
    unittest.main()
