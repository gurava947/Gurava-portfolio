import unittest

from support import run_solution


class NextCharactersTest(unittest.TestCase):
    def test_case_01_abc(self):
        """abc."""
        result = run_solution('next-characters', 'abc\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'b\nc\nd\n')

    def test_case_02_ey(self):
        """Hey."""
        result = run_solution('next-characters', 'Hey\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'I\nf\nz\n')


if __name__ == "__main__":
    unittest.main()
